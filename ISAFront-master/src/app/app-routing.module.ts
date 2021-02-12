import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestComponent } from './zahtevi/requests.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registracija/registration.component';
import { DoctorComponent } from './profiles/doctor.component';
import { DoktorHomePageComponent } from './profiles/doktor-home-page.component';
import { PatientsListComponent } from './lista-pacijenta/patients-list.component';
import { ClinicCenterAdministratorComponent } from './profiles/clinic-center-administrator.component';
import { ClinicComponent } from './pharmacy/clinic.component';
import { NewAppointmentComponent } from './nov-pregled/new-appointment.component';
import { PatientProfleComponent } from './profiles/patient-profile.component';
import { NurseHomePageComponent } from './profiles/nurse-home-page/nurse-home-page.component';
import { SearchForPatientsComponent } from './pretraga-za-pacijenta/search-for-patients.component';
import { PatientHomePageComponent } from './profiles/patient-home-page/patient-home-page.component';
import { ClinicsListComponent } from './pharmacy-list/clinics-list.component';
import { HospitalRoomSearchComponent } from './pretraga-admin/hospital-room-search.component';
import { MedicalRecordComponent } from './medicinski-izvestaj/medical-record.component';
import { CalendarComponent } from './kalendar/calendar.component';
import { HistoryOfAppointmentsComponent } from './istorija-pregleda/history-of-appointments.component';
import { RequestHolidayViewComponent } from './pregled-zahteva-odmor/request-holiday-view.component';
import { ClinicAdminHomePageComponent } from './profiles/clinic-admin-home-page/clinic-admin-home-page.component';
import { NewRoomComponent } from './pop-up-r/new-room.component';
import { AppointmentType } from './model/AppointmentType';
import { AppointmentTypesComponent } from './pregled-tip/appointment-types.component';
import { SurgeryHospitalRoomComponent } from './operacija-soba/surgery-hospital-room.component';
import { DoctorsListComponent } from './farmaceuti-lista/doctors-list.component';
import { DoctorsSearchComponent } from './pretraga-farmaceuti/doctors-search.component';
import { AddDoctorComponent } from './dodaj-farmaceut/add-doctor.component';
import { ClinicAdminProfileComponent } from './admin-apoteke/clinic-admin-profile.component';
import { PatientCreateAppointmentComponent } from './novi-zahtev/patient-create-appointment.component';
import { NewSurgeryComponent } from './pop-up-s/new-surgery.component';
import { AppointmentReportComponent } from './pregled-izvestaj/appointment-report.component';
import { ClinicProfileComponent } from './pharmacy-profile/clinic-profile.component';
import { HolidayRequest } from './model/HolidayRequest';
import { HolidayRequestsComponent } from './odmor-zahtevi/holiday-requests.component';
import { Component } from '@fullcalendar/core';
import { AdminReportsComponent } from './admin-izvestaji/admin-reports.component';
import { AppRequestsListComponent } from './lista-zahteva/app-requests-list.component';
import { FastAppointmentsComponent } from './brzi-pregledi/fast-appointments.component';
import { AlreadyCreatedAppointmentsComponent } from './zakazni-pregledi/already-created-appointments.component';
import { EditMedicalRecordComponent } from './izmena-medicinski-izvestaj/edit-medical-record.component';
import { ConfirmAccountComponent } from './potvrda-naloga/confirm-account.component';
import { DrugComponent } from './drug/drug.component';
import { DrugListComponent } from './drug-list/drug-list.component';
import { NewPromotionComponent } from './new-promotion/new-promotion.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { DermatologistSearchComponent } from './dermatologist-search/dermatologist-search.component';
import { DermatologistNewComponent } from './dermatologist-new/dermatologist-new.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sysadmin-home-page', component: ClinicCenterAdministratorComponent },
  { path: 'requests', component: RequestComponent },
  { path: 'new-pharmacy', component: ClinicComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'doctor', component: DoctorComponent },
  { path: 'pharmacistHomePage', component: DoktorHomePageComponent },
  { path: 'patients', component: PatientsListComponent },
  { path: 'nurse-home-page', component: NurseHomePageComponent },
  { path: 'newAppointment', component: NewAppointmentComponent },
  { path: 'patient-profile', component: PatientProfleComponent },
  { path: 'find-patient', component: SearchForPatientsComponent },
  { path: 'patient-home-page', component: PatientHomePageComponent },
  { path: 'pharmacies', component: ClinicsListComponent },
  { path: 'find-room', component: HospitalRoomSearchComponent },
  { path: 'medicalRecord', component: MedicalRecordComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'historyOfAppointments', component: HistoryOfAppointmentsComponent },
  { path: 'requestHolidayViewComponent', component: RequestHolidayViewComponent },
  { path: 'pharmacyadmin-home-page', component: ClinicAdminHomePageComponent },
  { path: 'new-room', component: NewRoomComponent },
  { path: 'surgery-hospital-room', component: SurgeryHospitalRoomComponent },
  { path: 'doctorsList', component: DoctorsListComponent },
  { path: 'patient-create-appointment', component: PatientCreateAppointmentComponent },
  { path: 'purchase-orders', component: AppointmentTypesComponent },
  { path: 'surgery-hospital-room', component: SurgeryHospitalRoomComponent },
  { path: 'doctors', component: DoctorsSearchComponent },
  { path: 'add-doc', component: AddDoctorComponent },
  { path: 'pharmacyadmin-profile', component: ClinicAdminProfileComponent },
  { path: 'new-surgery', component: NewSurgeryComponent },
  { path: 'appointment-report/:id', component: AppointmentReportComponent },
  { path: 'pharmacy-profile', component: ClinicProfileComponent },
  { path: 'holidays', component: HolidayRequestsComponent },
  { path: 'reports-admin', component: AdminReportsComponent },
  { path: 'appRequests', component: AppRequestsListComponent },
  { path: 'fast-app', component: FastAppointmentsComponent },
  { path: 'edit-medical-record', component: EditMedicalRecordComponent },
  { path: 'alreadyCreatedApp', component: AlreadyCreatedAppointmentsComponent },
  { path: 'edit-medical-record', component: EditMedicalRecordComponent },
  { path: 'confirm-account', component: ConfirmAccountComponent },
  { path: 'medications', component: DrugComponent },
  { path: 'medicationsList', component: DrugListComponent },
  { path: 'new-promotion', component: NewPromotionComponent },
  { path: 'dermatologists', component: DermatologistSearchComponent },
  { path: 'add-der', component: DermatologistNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
