import { LoginRequest, LoginResponse } from "./types/EduLink.Login";
import { TimetableRequest, TimetableResponse } from "./types/EduLink.Timetable";
import ical from 'ical-generator';
(async () => {
    const server: string | undefined = process.env.SERVER;
    const identifier: string | undefined = process.env.IDENTIFIER
    const user: string | undefined = process.env.ACCOUNT;
    const pass: string | undefined = process.env.PASSWORD;
    let randomIdentifier: string | undefined = process.env.RANDOM_IDENTIFER;
    let port = process.env.PORT ? Number(process.env.PORT) : undefined;
    let authToken: string;
    let learner_id: string;

    const missingVars = [];
    if (!server) missingVars.push("SERVER");
    if (!identifier) missingVars.push("IDENTIFIER");
    if (!user) missingVars.push("USER");
    if (!pass) missingVars.push("PASSWORD");
    if (!randomIdentifier) randomIdentifier = Bun.randomUUIDv7();
    if (!port) port = 5000;

    if (missingVars.length > 0) {
        console.error("[ERROR] Missing required environment variables:", missingVars.join(", "));
        process.exit(1);
    }

    const grabUser = async () => {
        const loginResponse = await Bun.fetch(server + "/api/?method=EduLink.Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Method": "EduLink.Login",
            },
            body: JSON.stringify(<LoginRequest>{
                jsonrpc: "2.0",
                method: "EduLink.Login",
                params: {
                    from_app: false,
                    fcm_token_old: "none",
                    username: user,
                    password: pass,
                    establishment_id: identifier?.toString(),
                },
                uuid: Bun.randomUUIDv7(),
                id: "1"
            })
        })

        if (!loginResponse.ok) {
            console.error("[ERROR] Failed to login! Status Code:", loginResponse.status, loginResponse.statusText)
            process.exit(1)
        }

        const loginData: LoginResponse = await loginResponse.json();
        if (!loginData.result.success) {
            console.error("[ERROR] Failed to login! Error:", loginData.result.error)
        }

        authToken = loginData.result.authtoken;
        learner_id = loginData.result.user.id.toString();
    }

    const grabTimetable = async () => {
        if (!authToken || !learner_id) {
            await grabUser();
        }
        const timetableResponse = await Bun.fetch(server + "/api/?method=EduLink.Timetable", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Method": "EduLink.Timetable",
                "Authorization": `Bearer ${authToken}`,
            },
            body: JSON.stringify(<TimetableRequest>{
                jsonrpc: "2.0",
                method: "EduLink.Timetable",
                params: {
                    date: new Date().toISOString().split("T")[0],
                    learner_id: learner_id,
                    format: 2,
                },
                uuid: Bun.randomUUIDv7(),
                id: "1"
            })
        })

        if (!timetableResponse.ok) {
            console.error("[ERROR] Failed to grab timetable! Status Code:", timetableResponse.status, "Message:", timetableResponse.statusText)
        }

        const timetableData: TimetableResponse = await timetableResponse.json();
        if (!timetableData.result.success) {
            console.error("[ERROR] Failed to login! Error:", timetableData.result.error)
        }

        const calendar = ical({ name: 'Openlink Calendar' });
        for (const week of timetableData.result.weeks) {
            for (const day of week.days) {
                const dayDate = new Date(day.date);

                for (const period of day.periods) {
                    if (period.empty) continue;

                    const lessons = day.lessons.filter(
                        (lesson) => lesson.period_id === period.id
                    );

                    for (const lesson of lessons) {
                        const periodStart = new Date(dayDate);
                        const periodEnd = new Date(dayDate);
                        const [sh, sm] = period.start_time.split(':').map(Number);
                        const [eh, em] = period.end_time.split(':').map(Number);

                        periodStart.setHours(sh, sm, 0, 0);
                        periodEnd.setHours(eh, em, 0, 0);
                        calendar.createEvent({
                            start: new Date(periodStart),
                            end: new Date(periodEnd),
                            summary: lesson.teaching_group?.subject ?? lesson.description,
                            location: lesson.room?.name ?? 'Unknown Room',
                        });
                    }
                }
            }
        }
        return calendar;
    }

    await grabUser();
    let timetable = await grabTimetable();
    Bun.serve({
        port,
        routes: {
            "/api/ical/:id": req => {
                if (req.params.id !== randomIdentifier) {
                    return Response.json({ message: "Not Found" }, { status: 404 })
                }
                return new Response(timetable.toString())
            }
        }
    })

    function scheduleDailyUpdate() {
        const now = new Date();
        const nextUpdate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0, 0, 0, 0
        );
        const delay = nextUpdate.getTime() - now.getTime();

        setTimeout(async () => {
            timetable = await grabTimetable();
            scheduleDailyUpdate();
            console.log("[Info] Timetable has been repulled to stay up to date.")
        }, delay);
    }

    scheduleDailyUpdate();
    console.log("[Info] Server is running at port", port, "with path identifier being", randomIdentifier)
})();

