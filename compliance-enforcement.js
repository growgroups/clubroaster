// Compliance enforcement layer for concept allocation paths.
if(typeof eligibleForFixture==='function'){
  const baseFixtureEligibility=eligibleForFixture;
  eligibleForFixture=function(p,f,kind){
    if(!baseFixtureEligibility(p,f,kind))return false;
    if(!p)return false;
    const check=allocationCompliance(p.name,kind);
    return check.ok;
  };
}
if(typeof mobileOpenGameEligibility==='function'){
  const baseOpenGameEligibility=mobileOpenGameEligibility;
  mobileOpenGameEligibility=function(g,p){
    const result=baseOpenGameEligibility(g,p);
    const check=allocationCompliance(p.name,'umpire');
    if(!check.ok&&!result.reasons.includes('Compliance: '+check.reason))result.reasons.push('Compliance: '+check.reason);
    result.eligible=result.reasons.length===0;
    return result;
  };
}
if(typeof saveAssignments==='function'){
  const baseSaveAssignments=saveAssignments;
  saveAssignments=function(f,u1,u2,coach){
    for(const [name,kind] of [[u1,'umpire'],[u2,'umpire'],[coach,'coach']]){
      if(!name)continue;
      const check=allocationCompliance(name,kind);
      if(!check.ok){toast(`${name} cannot be assigned: ${check.reason}.`);return false}
    }
    return baseSaveAssignments(f,u1,u2,coach);
  };
}
