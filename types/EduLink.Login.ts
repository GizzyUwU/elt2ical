
import { ApiRequest, EdulinkApiResponse } from "./api";

type LoginParams = {
  from_app: boolean;
  fcm_token_old: string;
  username: string;
  password: string;
  establishment_id: string;
};

export type LoginRequest = ApiRequest<"EduLink.Login", LoginParams>;
export type LoginResponse = EdulinkApiResponse<{
  api_version: number;
  establishment: {
    logo: string;
    name: string;
    rooms: [
      {
        id: string;
        code: string;
        name: string;
      },
    ];
    year_groups: [
      {
        id: string;
        name: string;
      },
    ];
    community_groups: [
      {
        id: string;
        name: string;
      },
    ];
    discover_groups: [
      {
        id: string;
        name: string;
      },
    ];
    applicant_admission_groups: [
      {
        id: string;
        name: string;
      },
    ];
    applicant_intake_groups: [
      {
        id: string;
        name: string;
      },
    ];
    form_groups: [
      {
        id: string;
        name: string;
        year_groups_id: string[];
        employee_id: string | null;
        room_id: string;
      },
    ];
    teaching_groups: [
      {
        id: string;
        name: string;
        employee_id: string | null;
        year_groups_id: string[] | null;
      },
    ];
    subjects: [
      {
        id: string;
        name: string;
        active: boolean;
      },
    ];
    report_card_target_types: [
      {
        id: string;
        code: string;
        description: string;
      },
    ];
  };
  authtoken: string;
  user: {
    establishment_id: string;
    id: string;
    gender: string;
    title: string | null;
    forename: string;
    surname: string;
    types: string[];
    username: string;
    community_group_id: string;
    form_group_id: string;
    year_group_id: string;
    avatar: {
      photo: string;
      cache: string;
      id: string;
    };
    remember_password_permitted: boolean;
  };
  analytics_enabled: string[];
  personal_menu: [
    {
      id: string;
      name: string;
    },
  ];
  learner_menu: Array<{
    id: string;
    name: string;
    submenu?: boolean;
  }>;
  sub_menu: {
    label: string;
  };
  can_create_messages: boolean;
  can_create_message_types: [];
  login_method: string;
  login_method_change_password: boolean;
  capabilities: {
    fcm: {
      remove_old_token: boolean;
    };
    data_colleciton: {
      move_cohabitees: boolean;
    };
    "icalendar.group_import": boolean;
    "communicator.enabled": boolean;
    communicator: {
      message_reply: boolean;
      email: {
        html: boolean;
        attachments: boolean;
      };
      parental_identification: {
        max_priority: string;
        parental_responsibility: string;
        options: {
          max_priority: {
            [key: string]: string;
          };
        };
      };
    };
    "communicator.reply_to": boolean;
    "communicator.switch_user": boolean;
    "communicator.select_all": boolean;
    forms: {
      switchteacher: boolean;
    };
    "communicator.create_message_types": string[];
    "communicator.new_message_recipients": string[];
    "parentevent.administrator": boolean;
    "parentevent.switchteacher": boolean;
    "parentevent.blockslot": boolean;
    "parentevent.video": boolean;
    "parentevent.guests": boolean;
    "marksheets.change_teacher": boolean;
    resourcebooking: {
      manager: boolean;
      version: number;
      tabs: string[];
    };
    "resourcebooking.manager": boolean;
    achievement: {
      create: boolean;
    };
    behaviour: {
      create: boolean;
      report_card: {
        detail: boolean;
      };
    };
    club: {
      create: boolean;
      export: boolean;
    };
    attendance: {
      create: boolean;
    };
    "homework.create": boolean;
    "homework.teaching_group_required": boolean;
    "homework.learnercreate": boolean;
    "homework.homework_issues": boolean;
    "behaviour_detentionmanagement.hide_learner_add": boolean;
    "behaviour_detentionmanagement.session_create": boolean;
    "calendar.event_create": boolean;
    "calendar.hide_sourcecog": boolean;
    "attendance.absense_management": boolean;
    noticeboard: {
      manager: boolean;
      folders: boolean;
    };
  };
  session: {
    expires: number;
  };
  miscellaneous: {
    upload: {
      chunksize: number;
      max_attachment_size: number;
      max_attachment_size_communicator: number;
      max_body_size_communicator: number;
    };
    max_status_last_visible: number;
    status_interval_background: number;
    session_expiry_modal: number;
    status_interval: number;
    status_in_background: boolean;
    app: {
      logout_on_pause: boolean;
    };
    editor: {
      defaultfont: string;
    };
  };
}>;

export type StatusResponse = EdulinkApiResponse<{
  lessons?: {
    current?: {
      period_id: string;
      room: {
        name: string;
        id: string;
        moved: boolean;
      };
      teaching_group: {
        id: string;
        name: string;
        subject: string;
      };
      teachers: string;
      start_time: string;
      end_time: string;
      period_name: string;
    };
    next?: {
      period_id: string;
      room: {
        name: string;
        id: string;
        moved: boolean;
      };
      teaching_group: {
        id: string;
        name: string;
        subject: string;
      };
      teachers: string;
      start_time: string;
      end_time: string;
      period_name: string;
    };
  };
  new_messages: number;
  new_forms: number;
  session: {
    expires: number;
  };
  noticeboard: {
    new_snippets: number;
    new_items: number;
  };
}>;