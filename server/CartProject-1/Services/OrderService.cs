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

        public async Task<ServiceResponse<OrderViewDto>> UpdateUserOrderAsync(int id, string role)
        {
            var result = new ServiceResponse<OrderViewDto>();

            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                result.AddError("Order", "Order doesn't exist");
                return result;
            }
            if(role == null)
            {
                result.AddError("role", "check whether the user is authentic");
            }
            else if(role == "User")
            {
                if (order.Status == OrderStatus.OntheWay)
                {
                    order.Status = OrderStatus.Cancelled;
                }
                else if (order.Status == OrderStatus.Delivered)
                {
                    order.Status = OrderStatus.Returned;
                }
                else
                {
                    order.Status = OrderStatus.OntheWay;
                }

            }
            else
            {
                if (order.Status == OrderStatus.OntheWay)
                {
                    order.Status = OrderStatus.Delivered;
                }
                else
                {
                    order.Status = OrderStatus.OntheWay;
                }

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
