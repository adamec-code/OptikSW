namespace OptikSW.Domain.Modules.Ordes.Entities
{
    public enum OrderStatus
    {
        New = 0,
        Ordered = 1,
        Prepared = 2,
        Completed = 3,
        Passed = 4,
        Canceled = 5
    }
}