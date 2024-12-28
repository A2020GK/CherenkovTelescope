function parseEvent(data) {
    data = data.split("\n")
    data.shift();
    data.pop();

    data.forEach((l, n)=>{
        l = l.split(",");
        l.forEach((s, i)=>l[i]=Number(s));
        data[n] = l
    });
    return data;
}
export default parseEvent;
