import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent  {
  public propertyId!: number;
  property = new Property();
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }
             

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];

    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['id'];
        this.housingService.getProperty(this.propertyId).subscribe(
          (data: any) => {
            this.property = data;
          }
        );
      }
    );
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/four.jpg',
        medium: 'assets/four.jpg',
        big: 'assets/four.jpg'
      },
      {
        small: 'assets/four.jpg',
        medium: 'assets/four.jpg',
        big: 'assets/four.jpg'
      },
      {
        small: 'assets/four.jpg',
        medium: 'assets/four.jpg',
        big: 'assets/four.jpg'
      },{
        small: 'assets/four.jpg',
        medium: 'assets/four.jpg',
        big: 'assets/four.jpg'
      },
      {
        small: 'assets/four.jpg',
        medium: 'assets/four.jpg',
        big: 'assets/four.jpg'
      }
    ];
  
}
}

