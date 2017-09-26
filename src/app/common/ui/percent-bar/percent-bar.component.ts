import { Component, OnChanges } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import * as d3 from 'd3';

@Component({
  selector: 'app-percent-bar',
  templateUrl: './percent-bar.component.html',
  styleUrls: ['./percent-bar.component.scss'],
  inputs: ['data']
})
export class PercentBarComponent implements OnChanges {

  data : Array<Object>;
  empty = true;
  colors = ['#2A3C7C', '#FC416D', '#FD9126', '#7ACA30'];

  constructor() { }

  buildPercentBar(data : Array<any>) : void {
    var width = 200;
    var colors = this.colors;

    var canvas = d3.select('.percent-bar')
      .append('svg')
      .style('background-color', '#999999')
      .attr('width', width)
      .attr('height', 20);

    var rects = canvas.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('height', 20)
      .transition()
      .duration(800)
      .attr('x', function(d,i) {
        if (i > 0) {
          var total = 0;
          for (var j = 0; j < i; j++) {
            total += data[j].value / 100 * width;
          }
          return total;
        } else {
          return 0;
        }
      })
      .attr('width', function(d,i) {
        return d.value / 100 * width;
      })
      .attr('height', 20)
      .attr('fill', function(d,i) {
        return colors[i];
      });
  }

  valueNotEmpty(values) {
    let sum = 0;
    values.forEach(function (val, indx) {
      sum += val.value;
    });

    if (sum > 0) {
      return true;
    } else {
      return false;
    }
  }

  ngOnChanges(...args : any[]) : void {
    let data = args[0].data.currentValue;
    this.empty = true;
    if (this.valueNotEmpty(data)) {
      this.empty = false;
      this.buildPercentBar(this.data);
    }
  }

}
