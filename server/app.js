const Koa = require("koa");
const Ticket = require("./modules/Ticket");

const app = new Koa();

const tickets = [];
const ticketsFull = [];

app.use(async (ctx) => {
  const { method } = ctx.request.querystring;

  switch (method) {
    case "allTickets":
      ctx.response.body = tickets;
      return;
    case "ticketById&id":
      ctx.response.body = tickets;
      return;
    case "createTicket":
      const ticket = new Ticket(name, satus);
      const ticketFull = ticket.createTicketFull(description);
      tickets.push(ticket);
      ticketsFull.push(ticketFull);
      ctx.response.status = 201;

      return;
    // TODO: обработка остальных методов
    default:
      ctx.response.status = 200;
      ctx.body = "Hello World!";
      return;
  }
});

app.listen(9000);
