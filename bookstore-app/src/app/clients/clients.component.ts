import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  newClientName: string = '';
  editClientData: any= null;
  isEditing: boolean = false;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  createClient() {
    if (this.newClientName.trim()) {
      this.clientService.createClient({ name: this.newClientName }).subscribe(client => {
        this.clients.push(client);
        this.newClientName = '';
      });
    }
  }
  startEdit(client: any) {
    this.editClientData = { ...client };
    this.isEditing = true;
  }

  editClient() {
    if (this.editClientData && this.editClientData.name.trim()) {
      this.clientService.updateClient(this.editClientData.id, this.editClientData).subscribe(updatedClient => {
        const index = this.clients.findIndex(client => client.id === updatedClient.id);
        if (index !== -1) {
          this.clients[index] = updatedClient;
        }
        this.cancelEdit();
      });
    }
  }
  cancelEdit() {
    this.editClientData = null;
    this.isEditing = false;
  }

  deleteClient(id: number) {
    this.clientService.deleteClient(id).subscribe(() => {
      this.clients = this.clients.filter(client => client.id !== id);
    });
  }
}
