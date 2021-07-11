import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  images:any[string]=[];
  packageName:any='';
  constructor(private route: ActivatedRoute) {
    
      /* eslint-disable no-console */
      this.packageName=this.route.snapshot.params.package;
/* eslint-enable no-console */
        
        
    
    
}

ngOnInit():void{
  if(this.packageName==='package1'){
  this.images = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((value) => `../../content/images/package1/${value}File .jpg`);   
}
else if(this.packageName==='package2'){
  this.images = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((value) => `../../content/images/package2/${value}File .jpg`);   
}
else{
    this.images = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map((value) => `../../content/images/package3/${value}File .jpg`);   
}
}
  

}
