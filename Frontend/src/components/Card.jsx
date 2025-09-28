import React from 'react';
export default function Card({title, children}){
  return (
    <div className="card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3 className="h1">{title}</h3>
      </div>
      <div style={{marginTop:8}}>{children}</div>
    </div>
  );
}
