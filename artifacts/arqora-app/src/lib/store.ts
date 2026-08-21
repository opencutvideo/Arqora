export type ProjectStatus = 'Active' | 'Planning' | 'In review' | 'Archived';
export type Risk = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'To do' | 'In progress' | 'Done';

export type Project = {
  id: string; name: string; client: string; type: string; status: ProjectStatus;
  progress: number; dueDate: string; owner: string; risk: Risk;
};
export type Task = {
  id: string; title: string; projectId: string; assignee: string; priority: 'Low' | 'Medium' | 'High';
  status: TaskStatus; dueDate: string;
};
export type CalendarEvent = { id: string; title: string; date: string; time: string; type: string; projectId: string };
export type Document = { id: string; name: string; projectId: string; category: string; version: string; status: 'Current' | 'In review' | 'Superseded'; updatedAt: string };
export type TeamMember = { id: string; name: string; role: string; email: string; initials: string; status: 'Available' | 'In a meeting' | 'Away' };
export type Activity = { id: string; title: string; detail: string; time: string; kind: string };

export const seedProjects: Project[] = [
  { id:'p1', name:'Riverside House', client:'Mara & Co.', type:'Residential', status:'Active', progress:72, dueDate:'2025-05-28', owner:'Nadia Pratama', risk:'Low' },
  { id:'p2', name:'Northline Offices', client:'Aster Group', type:'Workplace', status:'In review', progress:54, dueDate:'2025-06-14', owner:'Jon Bell', risk:'Medium' },
  { id:'p3', name:'Luma Courtyard', client:'Sora Developments', type:'Hospitality', status:'Planning', progress:21, dueDate:'2025-08-02', owner:'Nadia Pratama', risk:'Low' },
  { id:'p4', name:'Civic Arts Annex', client:'City of Bellmere', type:'Cultural', status:'Active', progress:88, dueDate:'2025-04-21', owner:'Anika Shah', risk:'High' },
];
export const seedTasks: Task[] = [
  { id:'t1', title:'Resolve stair core clash', projectId:'p4', assignee:'Anika Shah', priority:'High', status:'In progress', dueDate:'2025-04-16' },
  { id:'t2', title:'Issue window schedule', projectId:'p1', assignee:'Jon Bell', priority:'Medium', status:'To do', dueDate:'2025-04-18' },
  { id:'t3', title:'Client material review', projectId:'p2', assignee:'Nadia Pratama', priority:'High', status:'To do', dueDate:'2025-04-19' },
  { id:'t4', title:'Update landscape plan', projectId:'p3', assignee:'Milo Chen', priority:'Low', status:'Done', dueDate:'2025-04-11' },
  { id:'t5', title:'Publish tender package', projectId:'p4', assignee:'Anika Shah', priority:'High', status:'To do', dueDate:'2025-04-22' },
];
export const seedEvents: CalendarEvent[] = [
  { id:'e1', title:'Riverside client review', date:'2025-04-17', time:'10:00', type:'Review', projectId:'p1' },
  { id:'e2', title:'Coordination stand-up', date:'2025-04-18', time:'09:30', type:'Meeting', projectId:'p2' },
  { id:'e3', title:'Tender package deadline', date:'2025-04-22', time:'17:00', type:'Deadline', projectId:'p4' },
  { id:'e4', title:'Luma concept workshop', date:'2025-04-24', time:'14:00', type:'Workshop', projectId:'p3' },
];
export const seedDocuments: Document[] = [
  { id:'d1', name:'A-101 Ground floor plan', projectId:'p1', category:'Drawings', version:'04', status:'Current', updatedAt:'2025-04-14' },
  { id:'d2', name:'Finishes schedule', projectId:'p2', category:'Schedules', version:'02', status:'In review', updatedAt:'2025-04-12' },
  { id:'d3', name:'Planning statement', projectId:'p3', category:'Reports', version:'01', status:'Current', updatedAt:'2025-04-09' },
  { id:'d4', name:'Tender addendum 02', projectId:'p4', category:'Contracts', version:'02', status:'Superseded', updatedAt:'2025-04-08' },
];
export const seedTeam: TeamMember[] = [
  { id:'m1', name:'Nadia Pratama', role:'Studio director', email:'nadia@arqora.studio', initials:'NP', status:'Available' },
  { id:'m2', name:'Jon Bell', role:'Project architect', email:'jon@arqora.studio', initials:'JB', status:'In a meeting' },
  { id:'m3', name:'Anika Shah', role:'Technical lead', email:'anika@arqora.studio', initials:'AS', status:'Available' },
  { id:'m4', name:'Milo Chen', role:'Architectural designer', email:'milo@arqora.studio', initials:'MC', status:'Away' },
  { id:'m5', name:'Inez Walker', role:'Project coordinator', email:'inez@arqora.studio', initials:'IW', status:'Available' },
];
export const seedActivity: Activity[] = [
  { id:'a1', title:'Northline Offices moved to review', detail:'Jon Bell updated the project status', time:'12 min ago', kind:'project' },
  { id:'a2', title:'A-101 Ground floor plan uploaded', detail:'Riverside House · version 04', time:'48 min ago', kind:'document' },
  { id:'a3', title:'Client material review assigned', detail:'Nadia Pratama · due 19 Apr', time:'2 hr ago', kind:'task' },
  { id:'a4', title:'Tender package deadline added', detail:'Civic Arts Annex · 22 Apr', time:'Yesterday', kind:'calendar' },
];

export function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
export function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(`arqora:${key}`);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}
export function writeStored<T>(key: string, value: T) {
  localStorage.setItem(`arqora:${key}`, JSON.stringify(value));
}