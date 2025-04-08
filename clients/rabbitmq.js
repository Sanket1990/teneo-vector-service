import amqp from "amqplib";

export const consumeBlogEvents = async (onMessage) => {
  const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
  const channel = await connection.createChannel();

  await channel.assertQueue("cms.blogs");

  console.log("RabbitMQ connected (Vector Consumer)");

  channel.consume("cms.blogs", async (msg) => {
    try {
      const event = JSON.parse(msg.content.toString());
      console.log("Event received:", event);

      await onMessage(event);

      channel.ack(msg);
      console.log("Message acknowledged:", event);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });
};
