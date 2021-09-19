import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GatewaysListComponent } from './components/gateways-list/gateways-list.component';
import { DevicesListComponent } from './components/devices-list/devices-list.component';
import { RouterModule, Routes, ROUTES } from '@angular/router';
import { AddGatewayComponent } from './components/add-gateway/add-gateway.component';
import { FormsModule } from '@angular/forms';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';



// custome routes
const routes: Routes = [

  // gateway list
  { path: 'gateways', component: GatewaysListComponent },

  // devices list specific to gateway id
  { path: 'gateway-devices/:id', component: DevicesListComponent },

  // add gateway for add/post - update/put
  { path: 'add-gateway', component: AddGatewayComponent },
  { path: 'update-gateway/:id', component: AddGatewayComponent },

  // add/post device - update/put device
  { path: 'add-device/:id', component: AddDeviceComponent },
  { path: 'gateway-devices/:id/update-device/:deviceId', component: AddDeviceComponent },

  // in case of empty url or any url input - route to gateway list
  { path: '', redirectTo: '/gateways', pathMatch: 'full' },
  { path: '**', redirectTo: '/gateways', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    GatewaysListComponent,
    DevicesListComponent,
    AddGatewayComponent,
    AddDeviceComponent
  ],
  imports: [
    RouterModule.forRoot(routes), // configure the router based on routes.
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
