"use strict";(self.webpackChunkFindDoctor=self.webpackChunkFindDoctor||[]).push([[653],{7597:(J,E,c)=>{c.r(E),c.d(E,{ProfileDoctorModule:()=>O});var y=c(6895),S=c(3060),e=c(4650),Z=c(8556),b=c(4536),P=c(9943),U=c(1026),D=c(8768),M=c(3546),A=c(4859),T=c(9549),g=c(4144),i=c(4006),o=c(4385),l=c(3238);function u(s,p){if(1&s){const n=e.EpF();e.TgZ(0,"input",25),e.NdJ("change",function(a){e.CHM(n);const d=e.oxw();return e.KtG(d.changeImage(a))}),e.qZA()}}function r(s,p){if(1&s){const n=e.EpF();e.TgZ(0,"button",26),e.NdJ("click",function(){e.CHM(n);const a=e.oxw();return e.KtG(a.uploadAvatar())}),e._uU(1,"Update Avatar"),e.qZA()}}function h(s,p){if(1&s){const n=e.EpF();e.TgZ(0,"button",26),e.NdJ("click",function(){e.CHM(n);const a=e.oxw();return e.KtG(a.editAvatar())}),e._uU(1,"Change Avatar"),e.qZA()}}function v(s,p){if(1&s&&(e.TgZ(0,"mat-option",27),e._uU(1),e.qZA()),2&s){const n=p.$implicit;e.Q6J("value",n.name),e.xp6(1),e.hij(" ",n.description," ")}}function f(s,p){if(1&s){const n=e.EpF();e.ynx(0),e.TgZ(1,"button",26),e.NdJ("click",function(){e.CHM(n);const a=e.oxw();return e.KtG(a.edit())}),e._uU(2,"Edit"),e.qZA(),e.BQk()}}function m(s,p){if(1&s){const n=e.EpF();e.ynx(0),e.TgZ(1,"button",28),e.NdJ("click",function(){e.CHM(n);const a=e.oxw();return e.KtG(a.save())}),e._uU(2,"Save"),e.qZA(),e.BQk()}}const C=[{path:"",component:(()=>{class s{constructor(n,t,a,d,Q){this.findDoctorService=n,this.profileService=t,this.userService=a,this.uploadFileService=d,this.toast=Q,this.doctor=null,this.isEdit=!1,this.fullname="Full Name",this.avatarUrl="assets/images/default_avatar.jpeg",this.phone="",this.desc="",this.degrees="",this.selectedSpecialty=null,this.street="",this.city="",this.state="",this.zipcode="",this.isAvatarEditing=!1,this.file=null,this.specialties=[],this.getInfoPatient()}getInfoPatient(){let n=this.userService.getUserState()?.username;n&&this.profileService.getDoctorInfo(n).subscribe(t=>{console.log(t),this.doctor=t,this.doctor.avatarurl&&(this.avatarUrl=this.doctor.avatarurl),this.phone=this.doctor.phone,this.fullname=this.doctor.fullname,this.desc=this.doctor.description,this.selectedSpecialty=this.doctor.specialty,this.degrees=this.doctor.degrees,this.street=this.doctor.location.street,this.city=this.doctor.location.city,this.state=this.doctor.location.state,this.zipcode=this.doctor.location.zipcode})}ngOnInit(){this.findDoctorService.getSpecialties().subscribe(n=>{this.specialties=n})}edit(){this.isEdit=!0}save(){console.log("save profile doctor"),this.isEdit=!1;let n=this.userService.getUserState()?.username,t={};n&&(this.doctor&&(this.doctor.fullname!=this.fullname&&(t.fullname=this.fullname),this.doctor.phone!=this.phone&&(t.phone=this.phone),this.doctor.description!=this.desc&&(t.description=this.desc),this.doctor.specialty!=this.selectedSpecialty&&(t.specialty=this.selectedSpecialty),this.doctor.degrees!=this.degrees&&(t.degrees=this.degrees),t.location={street:this.street,city:this.city,state:this.state,zipcode:this.zipcode},console.log(t)),this.profileService.updateDoctorInfo(n,t).subscribe(a=>{console.log(a),this.doctor=a,this.doctor.avatarurl&&(this.avatarUrl=this.doctor.avatarurl),this.phone=this.doctor.phone,this.fullname=this.doctor.fullname,this.desc=this.doctor.description,this.selectedSpecialty=this.doctor.specialty,this.degrees=this.doctor.degrees,this.street=this.doctor.location.street,this.city=this.doctor.location.city,this.state=this.doctor.location.state,this.zipcode=this.doctor.location.zipcode,this.toast.success({detail:"Success Message",summary:"Update Successfully!",duration:5e3})},a=>{this.toast.error({detail:"Error Message",summary:a.error.error,duration:5e3})}))}changeImage(n){this.file=n.target.files[0]}editAvatar(){this.isAvatarEditing=!0}uploadAvatar(){if(this.file){console.log("going to upload file: ",this.file);const n=this.userService.getUserState();this.uploadFileService.uploadDoctorAvatar(n,this.file).subscribe(t=>{console.log(t),this.isAvatarEditing=!1,this.doctor=t,this.doctor.avatarurl&&(this.avatarUrl=this.doctor.avatarurl),this.phone=this.doctor.phone,this.fullname=this.doctor.fullname,this.desc=this.doctor.description,this.selectedSpecialty=this.doctor.specialty,this.degrees=this.doctor.degrees,this.street=this.doctor.location.street,this.city=this.doctor.location.city,this.state=this.doctor.location.state,this.zipcode=this.doctor.location.zipcode,this.toast.success({detail:"Success Message",summary:"Update avatar successfully!",duration:5e3})})}else console.log("There is no selected file"),this.toast.error({detail:"Error Message",summary:"There is no file selected!",duration:5e3})}}return s.\u0275fac=function(n){return new(n||s)(e.Y36(Z.$),e.Y36(b.H),e.Y36(P.K),e.Y36(U.f),e.Y36(D.s))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-profile-doctor"]],decls:72,vars:35,consts:[[1,"content-view"],[1,"left"],[1,"avatar"],["mat-card-image","",3,"src"],[2,"color","rgb(40, 57, 133)"],["type","file","accept","image/*","class","file-upload","color","primary",3,"change",4,"ngIf"],["mat-flat-button","","color","primary",3,"click",4,"ngIf"],[1,"right"],[1,"update-title"],[1,"edit-form"],["appearance","fill",1,"full-width"],["matInput","","placeholder","Full Name","name","fullname",3,"ngModel","disabled","value","ngModelChange"],["matInput","","placeholder","Phone Number","name","phone",3,"ngModel","value","disabled","ngModelChange"],["matInput","","placeholder","Description","name","desc",3,"ngModel","value","disabled","ngModelChange"],[3,"value","disabled","valueChange"],[3,"value",4,"ngFor","ngForOf"],["matInput","","placeholder","Degrees","name","degrees",3,"ngModel","value","disabled","ngModelChange"],[1,"full-width"],["matInput","","placeholder","Ex. 414 N B St","name","street",3,"ngModel","value","disabled","ngModelChange"],["matInput","","placeholder","Ex. Fairfield","name","city",3,"ngModel","value","disabled","ngModelChange"],["matInput","","placeholder","Ex. Iowa","name","state",3,"ngModel","value","disabled","ngModelChange"],["matInput","","maxlength","5","placeholder","Ex. 52556","name","zipcode",3,"ngModel","value","disabled","ngModelChange"],["postalCode",""],["align","end"],[4,"ngIf"],["type","file","accept","image/*","color","primary",1,"file-upload",3,"change"],["mat-flat-button","","color","primary",3,"click"],[3,"value"],["mat-flat-button","","color","warn",3,"click"]],template:function(n,t){if(1&n&&(e.TgZ(0,"div",0)(1,"div",1)(2,"mat-card")(3,"div",2),e._UZ(4,"img",3),e.qZA(),e.TgZ(5,"div",2)(6,"mat-card-title",4),e._uU(7),e.qZA()(),e.TgZ(8,"div",2),e.YNc(9,u,1,0,"input",5),e.YNc(10,r,2,0,"button",6),e.YNc(11,h,2,0,"button",6),e.qZA()()(),e.TgZ(12,"div",7)(13,"mat-card")(14,"mat-card-title",8),e._uU(15,"Update Profile"),e.qZA(),e.TgZ(16,"form",9)(17,"mat-form-field",10)(18,"mat-label"),e._uU(19,"Full Name"),e.qZA(),e.ynx(20),e.TgZ(21,"input",11),e.NdJ("ngModelChange",function(d){return t.fullname=d}),e.qZA(),e.BQk(),e.qZA(),e.TgZ(22,"mat-form-field",10)(23,"mat-label"),e._uU(24,"Phone Number"),e.qZA(),e.ynx(25),e.TgZ(26,"input",12),e.NdJ("ngModelChange",function(d){return t.phone=d}),e.qZA(),e.BQk(),e.qZA(),e.TgZ(27,"mat-form-field",10)(28,"mat-label"),e._uU(29,"Description"),e.qZA(),e.ynx(30),e.TgZ(31,"input",13),e.NdJ("ngModelChange",function(d){return t.desc=d}),e.qZA(),e.BQk(),e.qZA(),e.TgZ(32,"mat-form-field",10)(33,"mat-label"),e._uU(34,"Specialty"),e.qZA(),e.TgZ(35,"mat-select",14),e.NdJ("valueChange",function(d){return t.selectedSpecialty=d}),e.YNc(36,v,2,2,"mat-option",15),e.qZA()(),e.TgZ(37,"mat-form-field",10)(38,"mat-label"),e._uU(39,"Degrees"),e.qZA(),e.ynx(40),e.TgZ(41,"input",16),e.NdJ("ngModelChange",function(d){return t.degrees=d}),e.qZA(),e.BQk(),e.qZA(),e.TgZ(42,"table",17)(43,"tr")(44,"td")(45,"mat-form-field",10)(46,"mat-label"),e._uU(47,"Address Street"),e.qZA(),e.TgZ(48,"input",18),e.NdJ("ngModelChange",function(d){return t.street=d}),e.qZA()()(),e.TgZ(49,"td")(50,"mat-form-field",10)(51,"mat-label"),e._uU(52,"City"),e.qZA(),e.TgZ(53,"input",19),e.NdJ("ngModelChange",function(d){return t.city=d}),e.qZA()()()()(),e.TgZ(54,"table",17)(55,"tr")(56,"td")(57,"mat-form-field",10)(58,"mat-label"),e._uU(59,"State"),e.qZA(),e.TgZ(60,"input",20),e.NdJ("ngModelChange",function(d){return t.state=d}),e.qZA()()(),e.TgZ(61,"td")(62,"mat-form-field",10)(63,"mat-label"),e._uU(64,"Zip Code"),e.qZA(),e.TgZ(65,"input",21,22),e.NdJ("ngModelChange",function(d){return t.zipcode=d}),e.qZA(),e.TgZ(67,"mat-hint",23),e._uU(68),e.qZA()()()()(),e.TgZ(69,"div",2),e.YNc(70,f,3,0,"ng-container",24),e.YNc(71,m,3,0,"ng-container",24),e.qZA()()()()()),2&n){const a=e.MAs(66);e.xp6(4),e.Q6J("src",t.avatarUrl,e.LSH),e.xp6(3),e.hij("Username: ",null==t.doctor?null:t.doctor.username,""),e.xp6(2),e.Q6J("ngIf",t.isAvatarEditing),e.xp6(1),e.Q6J("ngIf",t.isAvatarEditing),e.xp6(1),e.Q6J("ngIf",!t.isAvatarEditing),e.xp6(10),e.s9C("value",null==t.doctor?null:t.doctor.fullname),e.Q6J("ngModel",t.fullname)("disabled",!t.isEdit),e.xp6(5),e.s9C("value",null==t.doctor?null:t.doctor.phone),e.Q6J("ngModel",t.phone)("disabled",!t.isEdit),e.xp6(5),e.s9C("value",null==t.doctor?null:t.doctor.description),e.Q6J("ngModel",t.desc)("disabled",!t.isEdit),e.xp6(4),e.Q6J("value",t.selectedSpecialty)("disabled",!t.isEdit),e.xp6(1),e.Q6J("ngForOf",t.specialties),e.xp6(5),e.s9C("value",null==t.doctor?null:t.doctor.degrees),e.Q6J("ngModel",t.degrees)("disabled",!t.isEdit),e.xp6(7),e.s9C("value",t.street),e.Q6J("ngModel",t.street)("disabled",!t.isEdit),e.xp6(5),e.s9C("value",t.city),e.Q6J("ngModel",t.city)("disabled",!t.isEdit),e.xp6(7),e.s9C("value",t.state),e.Q6J("ngModel",t.state)("disabled",!t.isEdit),e.xp6(5),e.s9C("value",t.zipcode),e.Q6J("ngModel",t.zipcode)("disabled",!t.isEdit),e.xp6(3),e.hij("",a.value.length," / 5"),e.xp6(2),e.Q6J("ngIf",!t.isEdit),e.xp6(1),e.Q6J("ngIf",t.isEdit)}},dependencies:[y.sg,y.O5,M.a8,M.n5,M.G2,A.lW,T.KE,T.bx,T.hX,g.Nt,i._Y,i.Fj,i.JJ,i.JL,i.nD,i.On,i.F,o.gD,l.ey],styles:[".content-view[_ngcontent-%COMP%]{padding:20px;display:flex}.left[_ngcontent-%COMP%]{min-width:300px;width:25%;margin:20px}.avatar[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.right[_ngcontent-%COMP%]{width:70%;margin:20px}.mat-card-image[_ngcontent-%COMP%]{padding:50px;width:200px;height:200px;clip-path:circle(100px at center)}.edit-form[_ngcontent-%COMP%], .full-width[_ngcontent-%COMP%]{width:100%}.update-title[_ngcontent-%COMP%]{padding-top:0;margin-bottom:20px;color:#283985}.mat-card[_ngcontent-%COMP%]{min-height:600px}.mat-form-field-appearance-outline.mat-form-field-disabled[_ngcontent-%COMP%]   .mat-form-field-outline[_ngcontent-%COMP%], .mat-input-element[_ngcontent-%COMP%]:disabled{color:gray}.button-update[_ngcontent-%COMP%]{margin:20px;display:flex;justify-content:center;align-items:center}"]}),s})()}];let w=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[S.Bz.forChild(C),S.Bz]}),s})(),O=(()=>{class s{}return s.\u0275fac=function(n){return new(n||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[y.ez,w,M.QW,A.ot,g.c,i.u5,o.LD]}),s})()},5017:(J,E,c)=>{c.d(E,{Ov:()=>D});var y=c(7579);c(4650);class D{constructor(i=!1,o,l=!0,u){this._multiple=i,this._emitChanges=l,this.compareWith=u,this._selection=new Set,this._deselectedToEmit=[],this._selectedToEmit=[],this.changed=new y.x,o&&o.length&&(i?o.forEach(r=>this._markSelected(r)):this._markSelected(o[0]),this._selectedToEmit.length=0)}get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}select(...i){this._verifyValueAssignment(i),i.forEach(l=>this._markSelected(l));const o=this._hasQueuedChanges();return this._emitChangeEvent(),o}deselect(...i){this._verifyValueAssignment(i),i.forEach(l=>this._unmarkSelected(l));const o=this._hasQueuedChanges();return this._emitChangeEvent(),o}setSelection(...i){this._verifyValueAssignment(i);const o=this.selected,l=new Set(i);i.forEach(r=>this._markSelected(r)),o.filter(r=>!l.has(r)).forEach(r=>this._unmarkSelected(r));const u=this._hasQueuedChanges();return this._emitChangeEvent(),u}toggle(i){return this.isSelected(i)?this.deselect(i):this.select(i)}clear(i=!0){this._unmarkAll();const o=this._hasQueuedChanges();return i&&this._emitChangeEvent(),o}isSelected(i){if(this.compareWith){for(const o of this._selection)if(this.compareWith(o,i))return!0;return!1}return this._selection.has(i)}isEmpty(){return 0===this._selection.size}hasValue(){return!this.isEmpty()}sort(i){this._multiple&&this.selected&&this._selected.sort(i)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(i){this.isSelected(i)||(this._multiple||this._unmarkAll(),this.isSelected(i)||this._selection.add(i),this._emitChanges&&this._selectedToEmit.push(i))}_unmarkSelected(i){this.isSelected(i)&&(this._selection.delete(i),this._emitChanges&&this._deselectedToEmit.push(i))}_unmarkAll(){this.isEmpty()||this._selection.forEach(i=>this._unmarkSelected(i))}_verifyValueAssignment(i){}_hasQueuedChanges(){return!(!this._deselectedToEmit.length&&!this._selectedToEmit.length)}}}}]);