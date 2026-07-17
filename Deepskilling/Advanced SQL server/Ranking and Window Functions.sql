WITH RankedProducts AS (
    SELECT 
        ProductID,
        ProductName,
        Category,
        Price,
        ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC) AS RowNum,
        RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS RankVal,
        DENSE_RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS DenseRankVal
    FROM Products
)
SELECT 
    ProductID,
    ProductName,
    Category,
    Price,
    RowNum,
    RankVal,
    DenseRankVal
FROM RankedProducts
WHERE DenseRankVal <= 3;