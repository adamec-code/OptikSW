using OptikSW.Domain.Interfaces;

namespace OptikSW.Core
{
    public static class QueryableExtensions
    {
        public static IEnumerable<T> WhereIfNotEmpty<T>(this IEnumerable<T> query, Func<T, bool> expression, object value)
        where T : IEntity
        {
            if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
            {
                return query;
            }

            return query.Where(expression);
        }
        public static IEnumerable<T> WhereIfNotNull<T>(this IEnumerable<T> query, Func<T, bool> expression, object value)
        where T : IEntity
        {
            if (value == null)
            {
                return query;
            }

            return query.Where(expression);
        }
    }
}
