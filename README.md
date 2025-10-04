# ELT2ICal

Ever had EdulinkOne Timetable ICalendar Link give you empty data? This project is solution to that! Instead of using Edulink's ICalendar this project generates it using timetable data from the EdulinkOne API

## Running ELT2ICal
### Docker

### Manual
This project is built using BunJS specific stuff like Bun.fetch requiring it to be ran in BunJS
```bash
$ bun install
$ bun run server.ts
```

## Configuration
```env
SERVER=https://www.edulinkone.com // REQUIRED - EdulinkOne Server URL
IDENTIFIER=1 // REQUIRED - EdulinkOne School ID
ACCOUNT=gizzy // REQUIRED - EdulinkOne Account Username
PASSWORD=meow // REQUIRED - EdulinkOne Account Password
RANDOM_IDENTIFER=0199af96-102d-7000-b422-16ac1d51993e // OPTIONAL - Used as a random identifier in url making hard to find it
```