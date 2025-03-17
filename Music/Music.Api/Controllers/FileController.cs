using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Music.Api.PostModels;
using Music.Api.PutModels;
using Music.Core.DTOs;
using Music.Core.Entities;
using Music.Core.IServices;
using Music.Service;
using System.IdentityModel.Tokens.Jwt;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Music.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        private readonly IMapper _mapper;
        public FileController(IFileService fileService, IMapper mapper)
        {
            _fileService = fileService;
            _mapper = mapper;
        }
        // GET: api/<FileController>
        [HttpGet]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<IEnumerable<FileDTO>>> Get()
        {
            return Ok(await _fileService.GetAllAsync());
        }

        // GET api/<FileController>/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<FileDTO>> Get(int id)
        {
            if (id <= 0)
                return BadRequest();
            var file = await _fileService.GetByIdAsync(id);
            if (file == null)
            {
                return NotFound();
            }
            return file;
        }

        // POST api/<FileController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FileDTO>> Post([FromBody] FilePostModel file)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);
            var userIdClaim = jwtToken.Claims.FirstOrDefault(c=>c.Type=="userId");
            if(userIdClaim == null)
                return Unauthorized();
            var userId = userIdClaim.Value;

            if (file == null)
                return BadRequest("No file Provided");
            var fileDto = _mapper.Map<FileDTO>(file);
            fileDto.CreatedBy = int.Parse(userId);

            try
            {
                var result = await _fileService.AddAsync(fileDto);
                return result;
            }
            catch (ArgumentException)
            {
                return BadRequest("Invalid file data.");
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT api/<FileController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<FileDTO>> Put(int id, [FromBody] FilePutModel file)
        {
            if (id <= 0)
                return BadRequest();
            var fileDto = _mapper.Map<FileDTO>(file);
            try
            {
                var result = await _fileService.UpdateAsync(id, fileDto);
                return result;
            }
            catch (KeyNotFoundException)
            {
                return NotFound("File not found");
            }
            catch (ArgumentException)
            {
                return BadRequest("Invalid file data.");
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE api/<FileController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<FileDTO>> Delete(int id)
        {
            if (id <= 0)
                return BadRequest();
            try
            {
                var userDto = await _fileService.DeleteAsync(id);
                return userDto;
            }
            catch (KeyNotFoundException)
            {
                return NotFound("File not found");
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
