using AutoMapper;
using Music.Core.DTOs;
using Music.Core.Entities;
using Music.Core.IRepositories;
using Music.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = Music.Core.Entities.File;

namespace Music.Service
{
    public class FileService : IFileService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public FileService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<IEnumerable<FileDTO>> GetAllAsync()
        {
            return _mapper.Map<List<FileDTO>>(await _repositoryManager.Files.GetAllAsync());
        }
        public async Task<FileDTO> GetByIdAsync(int id)
        {
            return _mapper.Map<FileDTO>(await _repositoryManager.Files.GetByIdAsync(id));
        }
        public async Task<FileDTO> AddAsync(FileDTO fileDto)
        {
            if (!IsValidFileType(fileDto.Type)||string.IsNullOrEmpty(fileDto.Name)||fileDto.Size> 5 * 1024 * 1024)
                throw new ArgumentException();

            var file = _mapper.Map<File>(fileDto);
            fileDto = _mapper.Map<FileDTO>(await _repositoryManager.Files.AddAsync(file));
            await _repositoryManager.SaveAsync();
            return fileDto;
        }
        public async Task<FileDTO> UpdateAsync(int id, FileDTO fileDto)
        {
            var f = await _repositoryManager.Files.GetByIdAsync(id);
            if (f == null)
                throw new KeyNotFoundException();
            if (!IsValidFileType(fileDto.Type) || string.IsNullOrEmpty(fileDto.Name) || fileDto.Size > 5 * 1024 * 1024)
                throw new ArgumentException();

            var file = _mapper.Map<File>(fileDto);
            fileDto = _mapper.Map<FileDTO>(await _repositoryManager.Files.UpdateAsync(id, file));
            await _repositoryManager.SaveAsync();
            return fileDto;
        }
        public async Task<FileDTO> DeleteAsync(int id)
        {
            var f = await _repositoryManager.Files.GetByIdAsync(id);
            if (f == null)
                throw new KeyNotFoundException();
            var fileDto = _mapper.Map<FileDTO>(await _repositoryManager.Files.DeleteAsync(id));
            await _repositoryManager.SaveAsync();
            return fileDto;
        }
        static bool IsValidFileType(string type)
        {
            string[] validExtensions = { "pdf", "mp3" };
            type = type.ToLower();
            return Array.Exists(validExtensions, validExtension => validExtension == type);
        }
    }
}
