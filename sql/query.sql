-- Traz a informação de todas vendas e clientes
select v.data_venda, v.cliente_id, i.preco_unitario, c.nome
from vendas v
inner join  itens_vendas i on v.vendas_id = i.item_id
inner join clientes c on v.cliente_id = c.cliente_id
go

--  query que traz os produtos mais vendidos por lucro ou por quantidade
SELECT p.nome AS produto, SUM(iv.quantidade) AS quantidade_vendida, sum(iv.preco_unitario) as Lucro_total
FROM itens_vendas iv
JOIN produtos p ON iv.produto_id = p.produto_id
GROUP BY p.nome
ORDER BY Lucro_total DESC; -- ou order by quantidade_vendida

--Uma query que conta a quantidade de clientes que temos em nossa plataforma
SELECT COUNT(cliente_id) AS [QUANTIDADE DE CLIENTES]
FROM clientes
GO

--  o lucro total de vendas
CREATE VIEW lucro_total as
select sum(valor_total) as [LUCRO TOTAL]
from vendas
GO

--  Essa query traz o lucro por categoria.
SELECT c.nome, sum(i.preco_unitario) AS total_vendas
FROM categorias c
inner join produtos p ON p.categoria_id = c.categoria_id
inner join itens_vendas i ON i.produto_id = p.produto_id
GROUP BY c.nome
ORDER BY total_vendas DESC
GO

