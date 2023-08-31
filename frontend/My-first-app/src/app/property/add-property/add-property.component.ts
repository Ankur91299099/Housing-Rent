import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Iproperty } from '../IProperty.interface';
import { IpropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router,
    private housingService: HousingService,
    private alertfy: AlertifyService) { }

  //@ViewChild('Form') addPropertyForm !:NgForm;
  @ViewChild('formsTabs')
  formsTabs!: TabsetComponent;
  nextClicked !: boolean;
  property = new Property();
  addPropertyForm!: FormGroup;
  cityList:any;

  propertyType: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishedType: Array<string> = ['Full', 'Semi', 'Unfurnished']

  propertyView: IpropertyBase = {
    Id: 0,
    SellRent: 0,
    Price: 0,
    PType: "",
    FType: "",
    Name: "",
    BHK: 0,
    BuiltArea: 0,
    City: "",
    RTM: 0
  };

  ngOnInit() {
    this.CreateAddPropertyForm();
    this.housingService.getAllCities().subscribe(data =>{
      this.cityList=data;
      console.log(data);
    })
  }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group(
      {

        BasicInfo: this.fb.group({
          SellRent: ['1', Validators.required],
          BHK: ['', Validators.required],
          PType: ['', Validators.required],
          FType: ['', Validators.required],
          Name: ['', Validators.required],
          City: ['', Validators.required]
        }),

        PriceInfo: this.fb.group({
          Price: [null, Validators.required],
          BuiltArea: [null, Validators.required],
          CarpetArea: [null],
          Security: [0],
          Maintenance: [0],
        }),

        AddressInfo: this.fb.group({
          FloorNo: [null],
          TotalFloor: [null],
          Address: [null, Validators.required],
          LandMark: [null],


        }),

        OtherInfo: this.fb.group({
          RTM: [null, Validators.required],
          PossessionOn: [null, Validators.required],
          AOP: [null],
          Gated: [null],
          MainEntrance: [null],
          Description: [null]
        })
      });

  }



  onSubmit() {
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertfy.success("Successfully register the property");
      if (this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }
    }
    else {
      this.alertfy.error("Please review  property");
    }
  }



  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formsTabs.tabs[tabId].active = true;
      this.nextClicked = false;
    }
  }



  allTabsValid(): boolean {
    console.log(this.AddressInfo)
    if (this.BasicInfo.invalid) {
      this.formsTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formsTabs.tabs[1].active = true;
     
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formsTabs.tabs[2].active = true;
     
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formsTabs.tabs[3].active = true;
      
      return false;
    }
    return true;
  }


  
  mapProperty(): void {
    this.property.Id=this.housingService.newPropID();
    this.property.SellRent = +this.BasicInfo.controls['SellRent'].value;
    this.property.BHK = this.BasicInfo.controls['BHK'].value;
    this.property.PType = this.BasicInfo.controls['PType'].value;
    this.property.Name = this.BasicInfo.controls['Name'].value;
    this.property.City = this.BasicInfo.controls['City'].value;
    this.property.FType = this.BasicInfo.controls['FType'].value;
    this.property.Price = this.PriceInfo.controls['Price'].value;
    this.property.Security = this.PriceInfo.controls['Security'].value;
    this.property.Maintenance = this.PriceInfo.controls['Maintenance'].value;
    this.property.BuiltArea = this.PriceInfo.controls['BuiltArea'].value;
    this.property.CarpetArea = this.PriceInfo.controls['CarpetArea'].value;
    this.property.FloorNo = this.AddressInfo.controls['FloorNo'].value;
    this.property.TotalFloor = this.AddressInfo.controls['TotalFloor'].value;
    this.property.Address = this.AddressInfo.controls['Address'].value;
    this.property.Address2 = this.AddressInfo.controls['LandMark'].value;
    this.property.RTM = this.OtherInfo.controls['RTM'].value;
    this.property.AOP = this.OtherInfo.controls['AOP'].value;
    this.property.Gated = this.OtherInfo.controls['Gated'].value;
    this.property.MainEntrance = this.OtherInfo.controls['MainEntrance'].value;
    //this.property.Possession = this.OtherInfo.controls['PossessionOn'].value;
    this.property.Description = this.OtherInfo.controls['Description'].value;
    this.property.PostedOn = new Date().toString();
  }






  get BasicInfo() {
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup
  }

  get PriceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup
  }

  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }

  get SellRent() {
    console.log(this.BasicInfo.controls['SellRent'] as FormGroup)
    return this.BasicInfo.controls['SellRent'] as FormGroup
  }

  get Price() {
    return this.PriceInfo.controls['Price'] as FormGroup
  }

  get BHK() {
    return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get PType() {
    return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType() {
    return this.BasicInfo.controls['FType'] as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls['Name'] as FormControl;
  }

  get City() {
    return this.BasicInfo.controls['City'] as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }
}
