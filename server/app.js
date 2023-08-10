const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Ticket = require("./modules/Ticket");

const app = new Koa();

const tickets = [];
const ticketsFull = [];

app.use(async (ctx, next) => {
  if (ctx.request.method !== "OPTIONS") {
    await next();

    return;
  }

  ctx.response.set("Access-Control-Allow-Origin", "*");

  ctx.response.set(
    "Access-Control-Allow-Methods",
    "DELETE, PUT, PATCH, GET, POST",
  );

  ctx.response.status = 204;
});

app.use(bodyParser());
app.use(async (ctx) => {
  const { method, id } = ctx.request.query;
  try {
    switch (method) {
      case "allTickets":
        ctx.body = tickets;
        break;
      case "ticketById":
        ctx.status = 200;
        ctx.body = ticketsFull.find((ticket) => ticket.id === id);
        break;
      case "createTicket":
        if (ctx.request.body) {
          let newTicket = new Ticket(
            ctx.request.body.name,
            ctx.request.body.status,
          );
          let newTicketFull = newTicket.createTicketFull(
            ctx.request.body.description,
          );
          tickets.push(newTicket);
          ticketsFull.push(newTicketFull);
          ctx.status = 201;
          ctx.body = newTicket.id;
        } else {
          ctx.status = 400;
          ctx.body = "Отсутствует тело запроса";
        }

        break;
      default:
        ctx.status = 404;
        return;
    }
  } catch (err) {
    console.error(err);
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
});

app.listen(8080);
