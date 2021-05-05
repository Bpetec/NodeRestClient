import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IRoll {
  id?: number;
  name: string;
  type: string;
  barrel: string;
  ammo: string;
  perkOne: string;
  perkTwo: string;
}

@Component({
  selector: 'app-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.css']
})
export class RollComponent implements OnInit {

  bikes: Array<IRoll> = [];
  myName = '';
  rolls = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    await this.refresh();
    // this.createRoll('roll', { make: 'Tesla', model: 'X'});
    // this.updateRoll('roll/id/1', { make: 'Ford', model: 'Fiasta'});
  }

  async refresh() {
    this.rolls = await this.getRolls('roll');
  }

  // getRolls('roll');
  async getRolls(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from getRolls()', resp);
    return resp;
  }

  async createRoll() {
    const roll = {
      name: null,
      type: null,
      barrel: null,
      ammo: null,
      perkOne: null,
      perkTwo: null
    };
    const resp = await this.http.post('roll', roll);
    console.log('from createRoll resp: ', resp);
    if (resp) {
      // this.refresh();
      this.rolls.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Roll create failed!');
    }
    return resp;
  }

  async updateRoll(roll: any) {
    console.log('from updateRoll roll: ', roll);
    const resp = await this.http.put(`roll/id/${roll.id}`, roll);
    if (resp) {
      this.toastService.showToast('success', 3000, 'Roll updated successfully!');
    }
    return resp;
  }

  async removeRoll(roll: any, index: number) {
    console.log('from removeRoll...', index);
    // this.rolls.splice(index, 1);
    const resp = await this.http.delete(`roll/id/${roll.id}`);
    console.log('resp from removeRoll...', resp);
    if (resp) {
      this.refresh();
    } else {
      this.toastService.showToast('danger', 3000, 'Delete roll failed!');

    }
  }


}
