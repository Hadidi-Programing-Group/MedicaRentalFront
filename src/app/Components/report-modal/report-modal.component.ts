import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent {
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
