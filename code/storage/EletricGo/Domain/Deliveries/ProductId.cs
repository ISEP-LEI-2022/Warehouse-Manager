using EletricGo.Domain.Shared;
using Newtonsoft.Json;

namespace EletricGo.Domain.Deliveries
{
    public class ProductId : EntityId
    {
        [JsonConstructor]
        public ProductId(Guid value) : base(value)
        {
        }

        public ProductId(string value) : base(value)
        {
        }

        override
        protected object createFromString(string text)
        {
            return new Guid(text);
        }

        override
        public string AsString()
        {
            Guid obj = (Guid)ObjValue;
            return obj.ToString();
        }


        public Guid AsGuid()
        {
            return (Guid)ObjValue;
        }
    }
}