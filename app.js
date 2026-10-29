'use strict';
const $=id=>document.getElementById(id);
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
const tasks=[
 {id:'onboarding',title:'Project onboarding',description:'Review the sample project brief and get familiar with the workspace.'},
 {id:'planning',title:'Project planning',description:'Outline milestones, estimates, and the next steps.'},
 {id:'implementation',title:'Implementation',description:'Build a small improvement from the sample project plan.'},
 {id:'testing',title:'Testing and documentation',description:'Check the work and record the results.'}
];
let entries=[{id:'sample-1',taskId:'onboarding',taskTitle:'Project onboarding',workDate:today(),minutes:60,notes:'Reviewed the sample brief.'},{id:'sample-2',taskId:'planning',taskTitle:'Project planning',workDate:today(),minutes:90,notes:'Prepared a draft project plan.'}];
let editId=null,deleteId=null,isAdmin=false;
const show=(message,error=false)=>{$('message').textContent=message;$('message').className=error?'error':'';};
const cell=(row,value)=>{const td=document.createElement('td');td.textContent=value;row.append(td);return td;};
function resetForm(){editId=null;$('entry-form').reset();$('date').value=today();$('form-title').textContent='Log your time';$('cancel-edit').hidden=true;}
function render(){
 const selected=$('task').value;$('tasks').replaceChildren();$('task').replaceChildren();
 for(const task of tasks){const el=document.createElement('div');el.className='task-item';const title=document.createElement('strong');title.textContent=task.title;const desc=document.createElement('p');desc.textContent=task.description;el.append(title,desc);$('tasks').append(el);const opt=document.createElement('option');opt.value=task.id;opt.textContent=task.title;$('task').append(opt);}
 if(tasks.some(t=>t.id===selected))$('task').value=selected;
 $('task-count').textContent=tasks.length;$('hour-count').textContent=(entries.reduce((sum,e)=>sum+e.minutes,0)/60).toFixed(1);$('entry-count').textContent=entries.length;
 $('entries').replaceChildren();$('all-entries').replaceChildren();$('empty').hidden=entries.length>0;
 for(const e of [...entries].sort((a,b)=>b.workDate.localeCompare(a.workDate))){
  const row=document.createElement('tr');[e.workDate,e.taskTitle,`${e.minutes} min`,e.notes].forEach(v=>cell(row,v));const controls=cell(row,'');
  const edit=document.createElement('button');edit.textContent='Edit';edit.onclick=()=>{editId=e.id;$('task').value=e.taskId;$('date').value=e.workDate;$('minutes').value=e.minutes;$('notes').value=e.notes;$('form-title').textContent='Edit time entry';$('cancel-edit').hidden=false;$('minutes').focus();};
  const del=document.createElement('button');del.textContent='Delete';del.className='danger';del.onclick=()=>{deleteId=e.id;$('delete-dialog').showModal();};controls.append(edit,del);$('entries').append(row);
  if(isAdmin){const all=document.createElement('tr');['Alex Morgan',e.workDate,e.taskTitle,e.minutes,e.notes].forEach(v=>cell(all,v));$('all-entries').append(all);}
 }
}
function start(admin){isAdmin=admin;$('identity').textContent=`Alex Morgan · ${admin?'Administrator demo':'Contractor demo'}`;$('login').hidden=true;$('workspace').hidden=false;$('logout').hidden=false;$('admin').hidden=!admin;resetForm();render();show('Sample workspace ready. Changes last only until you reload.');}
$('start-contractor').onclick=()=>start(false);$('start-admin').onclick=()=>start(true);
$('logout').onclick=()=>{$('workspace').hidden=true;$('admin').hidden=true;$('login').hidden=false;$('logout').hidden=true;$('identity').textContent='';$('delete-dialog').close();resetForm();show('');};
$('cancel-edit').onclick=resetForm;$('refresh').onclick=()=>{render();show('Demo view refreshed.');};
$('entry-form').onsubmit=e=>{
 e.preventDefault();const task=tasks.find(t=>t.id===$('task').value),minutes=Number($('minutes').value),workDate=$('date').value,notes=$('notes').value.trim();
 if(!task||!Number.isInteger(minutes)||minutes<1||minutes>1440||!/^\d{4}-\d{2}-\d{2}$/.test(workDate)||notes.length>1000){show('Choose a task, a work date, and between 1 and 1440 whole minutes.',true);return;}
 const updating=!!editId;const entry={id:editId||crypto.randomUUID(),taskId:task.id,taskTitle:task.title,workDate,minutes,notes};
 if(updating)entries=entries.map(item=>item.id===editId?entry:item);else entries.push(entry);
 resetForm();render();show(updating?'Sample entry updated.':'Sample time entry saved.');
};
$('keep-entry').onclick=()=>$('delete-dialog').close();
$('confirm-delete').onclick=()=>{entries=entries.filter(e=>e.id!==deleteId);if(editId===deleteId)resetForm();deleteId=null;$('delete-dialog').close();render();show('Sample entry deleted.');};
$('task-form').onsubmit=e=>{e.preventDefault();const title=$('task-title').value.trim(),description=$('description').value.trim();if(!title||title.length>120||description.length>1000){show('Enter a task title (up to 120 characters) and a short description.',true);return;}tasks.push({id:crypto.randomUUID(),title,description});$('task-form').reset();render();show('Sample task assigned to Alex Morgan.');};
