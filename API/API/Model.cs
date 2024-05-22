namespace API
{
    public enum CONDITION
    {
        UrgentInspection,
        RequiresInspection,
        Poor,
        Good,
        Excellent
    }

    public enum MATERIAL
    {
        Steel,
        Brick,
        Concrete,
        Ashphalt
    }
    public class Model
    {
        public int Id { get; set; }
        public CONDITION Condition { get; set; }
        public List<MATERIAL> Material { get; set; } = new List<MATERIAL>();
        public Nullable<System.DateTime> Inspection { get; set; }
    }
}
