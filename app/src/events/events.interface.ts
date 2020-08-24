export interface Event {
    // id
    eventType: EventType;
    trigger: string;
    details?: string | null;
    memberId?: number | null;
}

// (1,'signup'),(2,'login'),(3,'member-delete'),(4,'click'),(5,'pageview')
export enum EventType {
    signup = 'sign-up',
    signin = 'sign-in',
    memberDelete = 'member-delete',
    click = 'click',
    pageview = 'pageview',
  }