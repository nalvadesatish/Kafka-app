const {kafka}=require('./client')
const readline=require("readline")

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
async function init(){
    const producer=kafka.producer()
    console.log("Connecting producer")
    await producer.connect();
    console.log("Producer Connected")
    rl.setPrompt("> ")
    rl.on("line",async function(line){
        const [riderName,location]=line.split(" ")
        await producer.send({
            topic: 'Rider-updates',
            messages: [
                { key: 'location-update', value:JSON.stringify({name:riderName,loc:location}) , partition: location.toLowerCase()==="north"?0:1 },
            ],
        })
    }).on('close',async ()=>{
        await producer.disconnect()  
    })

    
    
    console.log("Producer Disconnected")

}
init()