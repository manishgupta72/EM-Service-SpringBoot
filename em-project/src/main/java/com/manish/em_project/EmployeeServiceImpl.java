package com.manish.em_project;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public String createEmployee(Employee employee) {
        // Check for duplicate email at the application level
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            return "Email already exists in the database employee";
        }

        EmployeeEntity employeeEntity = new EmployeeEntity();
        BeanUtils.copyProperties(employee, employeeEntity);

        try {
            // Attempt to save the entity
            employeeRepository.save(employeeEntity);
            return "Saved successfully";
        } catch (DataIntegrityViolationException ex) {
            // Handle database-level unique constraint violations
            return "Email already exists";
        }
    }

    @Override
    public List<Employee> readEmployees() {
        List<EmployeeEntity> employeesList = employeeRepository.findAll();
        List<Employee> employees = new ArrayList<>();
        for (EmployeeEntity employeeEntity : employeesList) {
            Employee emp = new Employee();
            emp.setId(employeeEntity.getId());
            emp.setName(employeeEntity.getName());
            emp.setEmail(employeeEntity.getEmail());
            emp.setPhone(employeeEntity.getPhone());
            employees.add(emp);
        }
        return employees;
    }

    @Override
    public boolean deleteEmployee(long id) {
        try {
            EmployeeEntity emp = employeeRepository.findById(id).get();
            if (emp != null) {

                employeeRepository.delete(emp);
                return true;
            }
        } catch (Exception e) {
            System.out.println("Id not found !" + e);
        }
        return false;

    }

    @Override
    public String updateEmployee(long id, Employee employee) {

        EmployeeEntity existEmployee = employeeRepository.findById(id).get();

        if (existEmployee.getId() != null) {
            try {
                if (existEmployee != null) {

                    System.out.println("a raha hu");
                    existEmployee.setEmail(employee.getEmail());
                    existEmployee.setName(employee.getName());
                    existEmployee.setPhone(employee.getPhone());
                    employeeRepository.save(existEmployee);
                    return "Employee updated successfully !";
                }

            } catch (Exception e) {
                System.out.println(e);
            }
        }

        return "Id Not found";

    }

    @Override
    public Employee readEmployee(Long id) {

        EmployeeEntity employeeEntity = employeeRepository.findById(id).get();
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeEntity, employee);

        return employee;
    }
}
