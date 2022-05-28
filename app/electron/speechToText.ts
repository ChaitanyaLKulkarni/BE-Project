// @ts-ignore
import recorder from "node-record-lpcm16";
import { Wit } from "node-wit";

const witToken = "5BBFWHTQ52JXMQNFF5I6P3S3VTNBHU4B"; //process.env.WIT_TOKEN; // get one from wit.ai!
const wit = new Wit({ accessToken: witToken }) as any;

function start() {
    recording.pause();
    recording.stream().pipe((s) => wit.speech("audio/wav", s, parseResult));
}

function parseResult(err: any, resp: any, body: any) {
    if (err) console.error(err);
    console.log(body);
}

const recording = recorder.record({
    recorder: "sox",
});
function start() {}

export default start;
