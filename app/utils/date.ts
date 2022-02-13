// 日付をYYYY-MM-DDの書式で返すメソッド
export function convertDateToString(dt: Date): string {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth() + 1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
}