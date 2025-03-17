using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Music.Api;
using Music.Core.Entities;
using Music.Data;
using MySqlX.XDevAPI;
using System.Text;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.ServiceDependencyInjector();

//builder.Services.AddDbContext<DataContext>(options =>
//{
//    var connectionString = Environment.GetEnvironmentVariable("MYSQL_CONNECTION_STRING");
//    //options.UseMySql("server = bgb9ojh8gaxhvg5hmvb9 - mysql.services.clever - cloud.com; database = bgb9ojh8gaxhvg5hmvb9; user = usjr0zjxfvslhjvf; password = ZlbVNmJxxCriv0AuAAMw");
//    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
//});
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

builder.Services.AddOpenApi();
//builder.Services.AddSwaggerGen(options =>
//{
//    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
//    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
//    {
//        Scheme = "Bearer",
//        BearerFormat = "JWT",
//        In = ParameterLocation.Header,
//        Name = "Authorization",
//        Description = "Bearer Authentication with JWT Token",
//        Type = SecuritySchemeType.Http
//    });
//    options.AddSecurityRequirement(new OpenApiSecurityRequirement
//    {
//        {
//            new OpenApiSecurityScheme
//            {
//                Reference = new OpenApiReference
//                {
//                    Id = "Bearer",
//                    Type = ReferenceType.SecurityScheme
//                }
//            },
//            new List<string>()
//        }
//    });
//});

builder.Services.AddCors(opt => opt.AddPolicy("MyPolicy", policy =>
{
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
}));



builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

// הוספת הרשאות מבוססות-תפקידים
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
});
var app = builder.Build();


//cors
app.UseCors("MyPolicy");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/openapi/v1.json", "OpenAPI V1");
    });
}
builder.Services.AddEndpointsApiExplorer();//
app.UseHttpsRedirection();//
app.UseAuthentication();//

app.UseAuthorization();

app.MapControllers();

app.Run();
