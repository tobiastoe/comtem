import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Customer } from 'src/app/customer/customer.model';
import { ModalController } from '@ionic/angular';
import { Retailer } from '../retailer.model';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-customer-details',
  templateUrl: './view-customer-details.component.html',
  styleUrls: ['./view-customer-details.component.scss'],
})
export class ViewCustomerDetailsComponent implements OnInit {
  @Input() customer: Customer;
  @Input() retailer: Retailer;

  // Data
  chartData: ChartDataSets[] = [{ data: [], label: '' }];
  chartLabels: Label[] = ['Happy', 'Relaxed', 'Sad', 'Stressed'];

  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Customer Behaviour in your Shop'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: ['#10dc60', '#989aa2', '#ffce00', '#f04141']
    }
  ];
  chartType = 'pie';
  showLegend = false;

  constructor(private modalCtrl: ModalController, private http: HttpClient) { }

  ngOnInit() {
    this.getDiagrammData();
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  setColor(currentEmotion) {
    switch (currentEmotion) {
      case 'Happy': {
        return 'success';
      }
      case 'Relaxed': {
        return 'medium';
      }
      case 'Sad': {
        return 'warning';
      }
      case 'Stressed': {
        return 'danger';
      }
    }
  }

  getDiagrammData() {
    let amountHappy = 0;
    let amountRelaxed = 0;
    let amountSad = 0;
    let amountStressed = 0;
    for (const emotion of this.customer.emotionHistory) {
      if (this.retailer.name === emotion.shop) {
        switch (emotion.emotion) {
          case 'Happy': {
            amountHappy = amountHappy + 1;
            break;
          }
          case 'Relaxed': {
            amountRelaxed = amountRelaxed + 1;
            break;
          }
          case 'Sad': {
            amountSad = amountSad + 1;
            break;
          }
          case 'Stressed': {
            amountStressed = amountStressed + 1;
            break;
          }
        }
      }
    }
    this.chartData[0].data = [amountHappy, amountRelaxed, amountSad, amountStressed];
  }


}
