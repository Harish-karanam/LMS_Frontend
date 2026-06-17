import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-hr-leave-balances',
  standalone: false,
  templateUrl: './hr-leave-balances.html',
  styleUrls: ['./hr-leave-balances.css']
})
export class HrLeaveBalances implements OnInit {

  leaveBalances: any[] = [];

  displayedColumns: string[] = [
    // 'userId',
   
    // 'leaveTypeId',
    // 'totalDays',
    // 'usedDays',
    // 'remainingDays',
    // 'year'
    'employeeCode',
  'employeeName',
  'sickLeave',
  'casualLeave',
  'earnedLeave',
  'maternityLeave',
  'lop',
  
  ];

  constructor(private auth: Auth,
              private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadLeaveBalances();
  }

  loadLeaveBalances(): void {
  this.auth.getAllEmployeeLeaveBalances().subscribe({
    next: (data: any[]) => {
      console.log('Leave Balances:', data);

      this.leaveBalances = data;
      this.cdr.detectChanges();
    },

    error: (err) => {
      console.error(err);
    }
  });
}

  // loadLeaveBalances(): void {
  //   this.auth.getAllEmployeeLeaveBalances().subscribe({
  //     next: (data: any[]) => {
  //       console.log('Leave Balances:', data);

  //       setTimeout(() => {
  //         this.leaveBalances = data;
           
  //       }, 0);
  //     },

  //     error: (err) => {
  //       console.error('Status:', err.status);
  //       console.error('Error:', err.error);
  //       console.error('Message:', err.message);
  //     }
  //   });
  // }
}