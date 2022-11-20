using System;
using EletricGo.Domain.Shared;
using Newtonsoft.Json;

namespace EletricGo.Domain.Storages
{
    public class ChargingSystemId : EntityId
    {
        [JsonConstructor]
        public ChargingSystemId(Guid value) : base(value)
        {
        }

        public ChargingSystemId(string value) : base(value)
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