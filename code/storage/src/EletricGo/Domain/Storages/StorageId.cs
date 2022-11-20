using System;
using EletricGo.Domain.Shared;
using Newtonsoft.Json;

namespace EletricGo.Domain.Storages
{
    public class StorageId : EntityId
    {
        [JsonConstructor]
        public StorageId(Guid value) : base(value)
        {
        }

        public StorageId(String value) : base(value)
        {
        }

        override
        protected  Object createFromString(String text){
            return new Guid(text);
        }

        override
        public String AsString(){
            Guid obj = (Guid) base.ObjValue;
            return obj.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}