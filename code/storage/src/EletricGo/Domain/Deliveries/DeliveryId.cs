using EletricGo.Domain.Shared;
using Newtonsoft.Json;

namespace EletricGo.Domain.Deliveries {
    public class DeliveryId : EntityId {

        [JsonConstructor]
        public DeliveryId(Guid value) : base(value) {
        }

        public DeliveryId(String value) : base(value) {
        }

        override
        protected Object createFromString(String text) {
            return new Guid(text);
        }

        override
        public String AsString() {
            Guid obj = (Guid)base.ObjValue;
            return obj.ToString();
        }


        public Guid AsGuid() {
            return (Guid)base.ObjValue;
        }
    }
}
