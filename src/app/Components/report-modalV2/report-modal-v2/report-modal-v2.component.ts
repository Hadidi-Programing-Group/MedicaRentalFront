import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-report-modal-v2',
  templateUrl: './report-modal-v2.component.html',
  styleUrls: ['./report-modal-v2.component.css']
})
export class ReportModalV2Component {
  @Input() contentA: string = '';
  @Input() contentB: string = '';
  @Input() successMessage: string = '';
  @Input() failureMessage: string = '';
  @Input() submitted = false
  @Input() success = false

  @Output() submitReportEvent = new EventEmitter();
  @Output() cancelReportEvent = new EventEmitter();

  @ViewChild('statement', { static: false }) statement: ElementRef | undefined;
  @ViewChild('title', { static: false }) title: ElementRef | undefined;


  cancel()
  {
    this.cancelReportEvent.emit()
  }

  report()
  {
    this.submitReportEvent.emit({
      statement: this.statement?.nativeElement?.value??'',
      title: this.title?.nativeElement?.value??''
    })
  }
}
