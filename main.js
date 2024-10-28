function get_calc(btn) {
    const display = document.dentaku.display;
    const value = display.value;
    const input = btn.value;

    // "="が押された時の計算実行
    if (input === "=") {
        try {
            display.value = eval(value);
        } catch (e) {
            display.value = "error";
        }
        return
    }

    // "AC"が押された時、クリア
    if (input === "AC") {
        display.value = "";
        return
    }

    // 先頭に "0","00" が来ることを防ぐ (例: "012",0012 → "12")
    if ((value === "0" || value === "00") && input >= "0" && input <= "9") {
        display.value = input;
        return;
    }

    // 演算子の連続入力を防ぐ (例: "12+++" → "12+")
    const lastChar = value.slice(-1);
    if("+-*/".includes(lastChar) && "+-*/".includes(input)) {
        return
    }
    // 小数点の連続入力を防ぐ (例: "1..2" → "1.2")
    if(input === "." && value.includes(".")) {
        const lastOperatorIndex = Math.max(value.lastOperatorIndexOf("+"), value.lastIndexOf("-"), value.lastIndexOf("*"), value.lastIndexOf("/"));
        if (lastOperatorIndex > -1 && value.slice(lastOperatorIndex).includes(".")) {
        return;
    } else if (lastOperatorIndex === -1 && value.includes(".")) {
        return;
    }
}

display.value += input;
}