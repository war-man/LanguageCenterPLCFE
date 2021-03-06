import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScheduleService } from 'src/app/admin/services/schedule.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LecturersService } from 'src/app/admin/services/lecturers.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { ClassroomService } from 'src/app/admin/services/classroom.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-schedule-dialog',
  templateUrl: './update-schedule-dialog.component.html',
  styleUrls: ['./update-schedule-dialog.component.css']
})
export class UpdateScheduleDialogComponent implements OnInit {

  public floatLabel = 'always';
  public schedule = {
    id: 0,
    fromDate: '',
    toDate: '',
    timeShift: '',
    daysOfWeek: '',
    status: 1,
    dateCreated: new Date(),
    note: '',
    lecturerId: '',
    classroomId: 0,
    languageClassId: '',
    content: ''
  };

  public lecturers;
  public classroom;
  public classes;

  public status = [];

  public learnerFormGroup: FormGroup;

  constructor(
    private scheduleService: ScheduleService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateScheduleDialogComponent>,
    public dialog: MatDialog,
    public lecturersService: LecturersService,
    public languageClassesService: LanguageClassesService,
    public classroomService: ClassroomService,
    public datepipe: DatePipe
  ) {
    this.setValueForSchedule();
  }

  ngOnInit() {
    this.getAllStatus();
    this.initializeForm();
    this.getAllLecturer();
    this.getAllClasses();
    this.getAllClassrooms();
  }

  public initializeForm() {
    this.learnerFormGroup = new FormGroup({
      fromDate: new FormControl(null, [Validators.required]),
      toDate: new FormControl(null, [Validators.required]),
      daysOfWeek: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      lecturerId: new FormControl(null, [Validators.required]),
      languageClassId: new FormControl(null, [Validators.required]),
      classroomId: new FormControl(null, [Validators.required]),
      content: new FormControl()
    });
  }

  public setValueForSchedule() {
    this.schedule.id = this.data._schedule.id;
    this.schedule.fromDate = this.data._schedule.fromDate;
    this.schedule.toDate = this.data._schedule.toDate;
    this.schedule.timeShift = this.data._schedule.timeShift;

    this.schedule.daysOfWeek = this.data._schedule.daysOfWeek;
    this.schedule.status = this.data._schedule.status;
    this.schedule.dateCreated = this.data._schedule.dateCreated;
    this.schedule.note = this.data._schedule.note;
    this.schedule.lecturerId = this.data._schedule.lecturerId;
    this.schedule.classroomId = this.data._schedule.classroomId;
    this.schedule.languageClassId = this.data._schedule.languageClassId;
    this.schedule.content = this.data._schedule.content;
  }

  private getAllStatus() {
    this.status = [
      {
        Name: 'Ch??? x???p l???ch',
        code: 2
      },
      {
        Name: '???? x???p l???ch',
        code: 1
      }];
  }

  public getAllLecturer() {
    this.lecturersService.getAllLecturers().subscribe(result => {
      this.lecturers = result;

    });
  }

  public getAllClasses() {
    this.languageClassesService.getAllLanguageClasses().subscribe(result => {
      this.classes = result;
    });
  }

  public getAllClassrooms() {
    this.classroomService.getAllClassRoom().subscribe(result => {
      this.classroom = result;
    });
  }

  public updateSchedule() {

    if (this.learnerFormGroup.valid) {
      this.scheduleService.putchedule(this.schedule).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'X???p l???ch', 'C???p nh???t khung l???ch th??nh c??ng!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'X???p l???ch', 'L???i,c???p nh???t x???p l???ch kh??ng th??nh c??ng!');
      });
    }
  }
}
