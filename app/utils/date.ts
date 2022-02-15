// 日付をYYYY-MM-DDの書式で返すメソッド
export function convertDateToString(dt: Date): string {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth() + 1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
}

export function convertDateToJpString(dt: Date): string {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth() + 1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '年' + m + '月' + d + '日');
}

// 月末日を取得
// 翌月の0日を指定することで、今月末日となる
export function convertToLastDayOfTheMonth(dt: Date): Date {
    return new Date(dt.getFullYear(), dt.getMonth() + 1, 0)
}