const createSingleStockDto = stock => {
    return {
        stock: stock?.symbol,
        price: stock?.latestPrice,
        likes: stock?.likes.length,
        companyName: stock?.companyName,
        latestSource: stock?.latestSource,
        latestUpdate: stock?.latestUpdate,
    }
}

const createDoubleStockDto = stocks => {
    return stocks.map((stock, index) => {
        let rel_likes;

        if (index == 0) {
            rel_likes = stocks[0]?.likes.length - stocks[1]?.likes.length;
        }
        else {
            rel_likes = stocks[1]?.likes.length - stocks[0]?.likes.length;
        }

        return {
            stock: stock?.symbol,
            price: stock?.latestPrice,
            rel_likes: rel_likes,
        }
    });
}

module.exports = {
    createSingleStockDto,
    createDoubleStockDto,
}