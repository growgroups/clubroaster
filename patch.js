const baseCanAction=canAction;
canAction=function(a){
  if(['playbookToggle','resetPlaybook'].includes(a)) return ['clubAdmin','associationAdmin','coordinator'].includes(role);
  return baseCanAction(a);
};
const baseOpenAction=openAction;
openAction=function(a,el){
  if(a==='guardianMessage') return baseOpenAction('newRequest',el);
  return baseOpenAction(a,el);
};
