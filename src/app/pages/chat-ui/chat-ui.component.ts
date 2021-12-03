import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';



@Component({
  selector: 'chat-ui',
  templateUrl: './chat-ui.component.html',
  providers: [ ChatService ],
  styleUrls: ['./chat-ui.component.scss']
})
export class ChatUIComponent  {
  data:any
  messages: any[];

  constructor(protected chatService: ChatService) {
    this.messages = this.chatService.loadMessages();
    let  datos= JSON.parse(localStorage.getItem('data'))
   this.data = datos.nombresUsuario;
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: `${this.data}`,
      },
    });
    const botReply = this.chatService.reply(event.message);
    if (botReply) {
      setTimeout(() => { this.messages.push(botReply); }, 500);
    }
  }
}
