export default function(str){
    let hash = 0;
    if (str.length == 0) return hash;
    for (var i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash < 0 ? (hash * -1) % 10 : hash % 10;
}
