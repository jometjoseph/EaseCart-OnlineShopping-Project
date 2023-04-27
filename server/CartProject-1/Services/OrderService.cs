using CartProject_1.Data;
using CartProject_1.Dto;
using CartProject_1.Types;

namespace CartProject_1.Services
{
    public class OrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ServiceResponse<OrderViewDto>> UpdateUserOrderAsync(int id, int status)
        {
            var result = new ServiceResponse<OrderViewDto>();

            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                result.AddError("Order", "Order doesn't exist");
                return result;
            }
            if(order.Status == OrderStatus.OntheWay && status == 2)
            {
                order.Status = OrderStatus.Delivered;
            }
            else if(order.Status == OrderStatus.OntheWay && status == 3)
            {
                order.Status = OrderStatus.Cancelled;
            }
            else if(order.Status == OrderStatus.Delivered && status == 4)
            {
                order.Status = OrderStatus.Returned;
            }
            else
            {
                order.Status=OrderStatus.OntheWay;
            }

            await _context.SaveChangesAsync();

            result.Result = new OrderViewDto()
            {
                Id = id,
                Quantity = order.Quantity,
                Total = order.Total,
                Status = order.Status,
                Product = null,
                ApplicationUser = null
            };

            return result;
        }
    }
}
