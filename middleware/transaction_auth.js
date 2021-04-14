export default function isValidPurchase(value1, value2){
    if (value1-value2>= 0) {
        return true;
    } else {
        return false;
    }
}
