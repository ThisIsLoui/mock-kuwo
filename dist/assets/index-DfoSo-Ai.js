import{K as c,a0 as d,j as s,o as i}from"./index-VZJwm443.js";const r="_title_lslfe_1",x="_list_lslfe_21",h="_value_lslfe_40",j="_profile_lslfe_44",l={title:r,list:x,value:h,profile:j};function n(){const e=c(),{data:a,isFetching:t}=d({artistId:e.id||""});return s.jsx(s.Fragment,{children:t?s.jsx(i,{style:{marginTop:"80px"}}):s.jsxs(s.Fragment,{children:[s.jsx("div",{className:l.title,children:"基本信息"}),s.jsxs("ul",{className:l.list,children:[s.jsxs("li",{children:[s.jsxs("p",{children:["姓名：",s.jsx("span",{className:l.value,children:(a==null?void 0:a.data.name)||"-"})]}),s.jsxs("p",{children:["英文名：",s.jsx("span",{className:l.value,children:"-"})]})]}),s.jsxs("li",{children:[s.jsxs("p",{children:["性别：",s.jsx("span",{className:l.value,children:(a==null?void 0:a.data.gener)||"-"})]}),s.jsxs("p",{children:["国籍：",s.jsx("span",{className:l.value,children:(a==null?void 0:a.data.country)||"-"})]})]}),s.jsxs("li",{children:[s.jsxs("p",{children:["出生地：",s.jsx("span",{className:l.value,children:(a==null?void 0:a.data.birthplace)||"-"})]}),s.jsxs("p",{children:["语言：",s.jsx("span",{className:l.value,children:(a==null?void 0:a.data.language)||"-"})]})]}),s.jsxs("li",{children:[s.jsxs("p",{children:["生日：",s.jsx("span",{className:l.value,children:(a==null?void 0:a.data.birthday)||"-"})]}),s.jsxs("p",{children:["星座：",s.jsx("span",{className:l.value,children:(a==null?void 0:a.data.constellation)||"-"})]})]}),s.jsxs("li",{children:[s.jsxs("p",{children:["身高：",s.jsx("span",{className:l.value,children:(a==null?void 0:a.data.tall)||"-"})]}),s.jsxs("p",{children:["体重：",s.jsx("span",{className:l.value,children:(a==null?void 0:a.data.weight)||"-"})]})]})]}),s.jsx("div",{className:l.title,children:"个人简介"}),s.jsx("p",{className:l.profile,dangerouslySetInnerHTML:{__html:(a==null?void 0:a.data.info)||"暂无简介"}})]})})}export{n as default};