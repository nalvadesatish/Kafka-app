const {kafka}=require("./client")

async function init() {
    const admin =kafka.admin()
    console.log("Admin Connecting")
    admin.connect()
    console.log("Admin Connected Successfully")
    await admin.createTopics({
        topics:[
        {
        topic:"Rider-updates",
        numPartitions: 2,

        },]
    });
    console.log("Topic Created Success [Rider-updates]")
    await admin.disconnect();

}
init();