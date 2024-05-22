using Microsoft.AspNetCore.Mvc;
using System;
using Syncfusion.XlsIO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API
{
    [Route("api/prediction")]
    [ApiController]
    public class PredictionController : ControllerBase
    {
        public static Prediction Data = new Prediction();

        public static void Initialize()
        {
            if (!Data.Initialized)
                Data.Initialize();
        }

        // GET api/<ValuesController>/5
        [HttpGet("{date}")]
        public string GetCondition(string date)
        {
            if (DateTime.TryParseExact(date, "yyyy-MM-dd HH:mm:ss", null, System.Globalization.DateTimeStyles.None, out DateTime predictTime))
                return $"{PredictionController.Data.GetCondition(predictTime)}";
            else
                return "Invalid Date";
        }

        // GET api/<ValuesController>/5
        [HttpGet("{date}/{x}/{y}")]
        public string Predict(string date, int x, int y)
        {
            if (DateTime.TryParseExact(date, "yyyy-MM-dd HH:mm:ss", null, System.Globalization.DateTimeStyles.None, out DateTime predictTime))
                return $"{PredictionController.Data.Predict(predictTime, x, y)}";
            else
                return "Invalid Date";
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
            //if ends up hooking to database ReSharp
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
            //if ends up hooking to database ReSharp
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            //if ends up hooking to database ReSharp
        }

        public class Prediction
        {
            private bool _initialized = false;
            public bool Initialized => _initialized;
            private static readonly object fileLock = new object();


            private const string BASE_FILE_PATH = "CC2Prediction/Prediction_Data_";
            private const string EXTENTION = ".xlsx";
            private const int DAY_RANGE = 43;
            private const int FILE_AMOUNT = 10;

            private const int X_SIZE = 164;
            private const int Y_SIZE = 251;

            private Dictionary<string, float> _conditionThresholds = new Dictionary<string, float>() { { "Urgent Inspection", 30 }, { "Requires Inspection", 20 }, { "Poor", 10 }, { "Good", 5 }, { "Excellent", 0 } };
            private DateTime _startTime = DateTime.Now;

            private float[,] _rateOfChange;
            private float _averageRateOfChange;


            //Converting range values into 2 dimensional array
            public void AddArrayValues(IWorksheet worksheet, IRange range)
            {
                int startRow = range.Row;
                int startCol = range.Column;
                int endRow = range.LastRow;
                int endCol = range.LastColumn;
                float averageForSpreadsheet = 0f;
                //float[,] numbers = new float[endRow - startRow + 1, endCol - startCol + 1];

                for (int x = 0; x <= endRow - startRow; x++)
                {
                    for (int y = 0; y <= endCol - startCol; y++)
                    {
                        if (float.TryParse(worksheet[startRow + x, startCol + y].Value, out float value))
                        {
                            _rateOfChange[x, y] += value;
                            averageForSpreadsheet += value;
                            //numbers[i, j] = value;
                            Console.Write(value);
                        }
                        else
                            Console.Write($"Invalid Value At Line {x} {y}");
                        Console.Write("\t");
                    }
                    Console.Write("\n______________________________________________\n");
                }
                _averageRateOfChange += averageForSpreadsheet / ((endRow - startRow) * (endCol - startCol));
            }

            public void Initialize()
            {
                _rateOfChange = new float[X_SIZE, Y_SIZE];
                ExcelEngine excelEngine = new ExcelEngine();

                IApplication application = excelEngine.Excel;
                application.DefaultVersion = ExcelVersion.Xlsx;

                string appDataPath = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);

                for (int i = 0; i < FILE_AMOUNT; i++)
                {
                    string filePath = Path.Combine(appDataPath, BASE_FILE_PATH + i + EXTENTION);
                    if (System.IO.File.Exists(filePath))
                    {
                        lock (fileLock)
                        {
                            using (FileStream fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read))
                            {
                                IWorkbook workbook = application.Workbooks.Open(fileStream);
                                IWorksheet worksheet = workbook.Worksheets[0];

                                IRange range = worksheet["A1:IQ164"];
                                AddArrayValues(worksheet, range);
                            }
                        }
                    }
                    else
                    {
                        Console.Write($"Missing File At Path {filePath}\n");
                    }
                }

                _averageRateOfChange = _averageRateOfChange / DAY_RANGE;
                for (int x = 0; x < X_SIZE; x++)
                {
                    for (int y = 0; y < Y_SIZE; y++)
                    {
                        _rateOfChange[x, y] = _rateOfChange[x, y] / DAY_RANGE;
                    }
                }
            }


            public float Predict(DateTime time, int positionX, int positionY)
            {
                int totalCount = 0;
                float total = 0;
                for (int x = positionX - 5; x < positionX + 5; x++)
                {
                    for (int y = positionY - 5; y < positionY + 5; y++)
                    {
                        if (x > 0 && x < X_SIZE && y > 0 && y < Y_SIZE)
                        {
                            total += _rateOfChange[positionX, positionY];
                            totalCount++;
                        }
                    }
                }
                return (total / totalCount) * (float)((time - _startTime).TotalDays);
            }

            public string GetCondition(DateTime time)
            {
                float current = _averageRateOfChange * (float)((time - _startTime).TotalDays);
                foreach (string condition in _conditionThresholds.Keys)
                {
                    if (current >= _conditionThresholds[condition])
                        return condition;
                }
                return "";
            }
        }
    }
}
